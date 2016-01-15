"use strict";

angular.module('accordion',[])
.controller('accordionController', function(){
  var tabs = [];
  this.size = {"width":this.width,
                 "height":this.height};                  
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
       
         let closedTabHeight = 100 / ((this.totalTabs*1) + 2); //*1 otherwise it takes string 6 + 2 = "62"
         console.log('closedheight: ' + closedTabHeight);
        let openTabHeight   = closedTabHeight * 3;
         console.log('openTabHeight: ' + openTabHeight);
            if(tab.isOpened){
                tab.tabStyle ={"background-color":tab.color,"height":openTabHeight + '%'}; 
            }
            else{
              tab.tabStyle ={"background-color":tab.color,"height":closedTabHeight + '%'}; 
            }
            console.log('addtab ' + tabs.length);
            tabs.push(tab);   
   } 
}) 
.directive('accordion',function(){
  return{ 
    restrict:'EA',
    bindToController: {
     width:'@',
            height:'@',
            totalTabs:'@'},
    scope: {
           
           },
    transclude:true, 
    controller:'accordionController',
    controllerAs: 'accordionCtrl',
    template: '<div class="box" ng-style=accordionCtrl.size ng-transclude> </div>'
   }
})
.directive('accordionTab', function() {
  return {
    restrict: 'EA',
    require:'^accordion',
    replace:true,
    scope:{  
  },
    bindToController:{
    itemTitle: '@',
        initiallyOpen:'=',
        color:'@'},
    controller: function(){
        this.isOpened = (this.initiallyOpen) ?true:false;
        this.tabStyle = {"background-color":this.color};
        var accordionController = controllers[0];
        accordionController.addTabs(this);
        this.toggleTab = function(){
            if(!this.isOpened){
            accordionController.openTab(this);
            }
        }
    },
    controllerAs: 'tabCtrl',
    transclude:true,   
    
    template: '<div class="tab" ng-class="{active:isOpened}" ng-click=toggleTab() ng-style="tabStyle">'
     +         ' <div class="innertab">'
     +           ' <div class="titlebar">'
     +              '<span class="lineleft" ng-class="{ slideInLeft:isOpened,slideOutLeft:isClosed}"></span>'
     +              '<p>{{itemTitle}}</p>'
     +              '<span class="lineright" ng-class="{slideInRight:isOpened,slideOutRight:isClosed}"></span>'
     +          ' <div class="text" ng-transclude></div>'
     +       '</div>'
     +  ' </div>'
     + '</div>'
    //'./template/tab.html'
  }
  
})

