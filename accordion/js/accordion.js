"use strict";

angular.module('accordion',[])
.controller('accordionController',['$scope', function($scope){
  var tabs = [];
  $scope.size = {"width":$scope.width,
                 "height":$scope.height};                  
  this.openTab = function(tabToOpen){
        let closedTabHeight = 100 / (tabs.length + 2);
        let openTabHeight   = closedTabHeight * 3;
  
        angular.forEach(tabs,function(tab){
        if(tab.isOpened){
            tab.isClosed=true;
            tab.isOpened = false;  
            tab.tabStyle = {"background-color":tab.color, "height":closedTabHeight + '%'}; 
        }
        });
        tabToOpen.isOpened=true;
        tabToOpen.tabStyle ={"background-color":tabToOpen.color,"height":openTabHeight + '%'}; 
        tabToOpen.isClosed=false;
  };
  
   this.addTabs = function(tab) {
       
           let closedTabHeight = 100 / (($scope.totalTabs*1) + 2); //*1 otherwise it takes string 6 + 2 = "62"
           let openTabHeight   = closedTabHeight * 3;     
            if(tab.isOpened){
                tab.tabStyle ={"background-color":tab.color,"height":openTabHeight + '%'}; 
            }
            else{
              tab.tabStyle ={"background-color":tab.color,"height":closedTabHeight + '%'}; 
            }
        
            tabs.push(tab);   
   } 
}]) 
.directive('accordion',function(){
  return{ 
   restrict:'EA',
    scope: {
            width:'@',
            height:'@',
            totalTabs:'@'
           },
    transclude:true, 
    controller:'accordionController',
    template: '<div class="box" ng-style=size ng-transclude> </div>'
   }
})
.directive('accordionTab', function() {
  return {
    restrict: 'EA',
    require:'^accordion',
    replace:true,
    scope:{
    itemTitle: '@',
    initiallyOpen:'=',
    color:'@'
  },
    transclude:true,
    link: function(scope, element,attrs, accordionController){
      scope.isOpened = (scope.initiallyOpen) ?true:false;
  
      scope.tabStyle = {"background-color":scope.color};
     
      accordionController.addTabs(scope);
      
      scope.toggleTab = function(){
        if(!scope.isOpened){
          accordionController.openTab(this);
        }
      }
      
    },
    template: '<div class="tab" ng-class="{active:isOpened}" ng-click=toggleTab() ng-style="tabStyle">'
     +  ' <div class="innertab">'
     +      ' <div class="titlebar">'
     +           '<span class="lineleft" ng-class="{ slideInLeft:isOpened,slideOutLeft:isClosed}"></span>'
     +          ' <p>{{itemTitle}}</p>'
     +           '<span class="lineright" ng-class="{slideInRight:isOpened,slideOutRight:isClosed}"></span>'
     +           '</div>'
     + ' <div ng-transclude></div>'
     +  ' </div>'
     + '</div>'
    //'./template/tab.html'
  }
  
})
.directive('accordionContent', function(){
    return {
        restrict:'EA',
        require:'^accordionTab',
        replace:true,
        transclude:true,
        template:'<div class="accordionContent" ng-class={slideInBottom:isOpened} ng-transclude></div>',
    }
})

