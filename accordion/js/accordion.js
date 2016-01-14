angular.module('accordion',[])
.controller('accordionController',['$scope', function($scope){
  var tabs = [];
  $scope.size = {"width":$scope.width,
                 "height":$scope.height};
  this.openTab = function(tabToOpen){
     angular.forEach(tabs,function(tab){
       if(tab.isOpened){
         tab.isClosed=true;
         tab.isOpened = false;  
       }
     });
     tabToOpen.isOpened=true;
     tabToOpen.isClosed=false;
  };
  
   this.addTabs = function(tab) {
            tabs.push(tab);   
   } 
}]) 
.directive('accordion',function(){
  return{ 
   restrict:'EA',
    scope: {
            width:'@',
            height:'@'
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
      scope.backgroundcolor = {"background-color":scope.color};
     
      accordionController.addTabs(scope);
      
      scope.toggleTab = function(){
        if(!scope.isOpened){
          accordionController.openTab(this);
        }
      }
      
    },
    template: '<div class="tab" ng-class="{active:isOpened}" ng-click=toggleTab() ng-style="backgroundcolor">'
     +  ' <div class="innertab">'
     +      ' <div class="titlebar">'
     +           '<span class="lineleft" ng-class="{ slideInLeft:isOpened,slideOutLeft:isClosed}"></span>'
     +          ' <p>{{itemTitle}}</p>'
     +           '<span class="lineright" ng-class="{slideInRight:isOpened,slideOutRight:isClosed}"></span>'
     +          ' <div class="text" ng-transclude></div>'
     +       '</div>'
     +  ' </div>'
     + '</div>'
    //'./template/tab.html'
  }
  
})

