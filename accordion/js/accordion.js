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
           
        if(tab.tabCtrl.isOpened){ 
            tab.tabCtrl.isClosed=true;
            tab.tabCtrl.isOpened = false;  
            tab.tabCtrl.tabStyle = {"background-color":tab.tabCtrl.color, "height":closedTabHeight + '%'}; 
        }
        });
        tabToOpen.isOpened=true;
        tabToOpen.tabStyle ={"background-color":tabToOpen.color,"height":openTabHeight + '%'}; 
        tabToOpen.isClosed=false;
  };
  
   this.addTabs = function(tab) {

         let closedTabHeight = 100 / ((this.totalTabs*1) + 2); //*1 otherwise it takes string 6 + 2 = "62"     
         let openTabHeight   = closedTabHeight * 3;      
            if(tab.tabCtrl.isOpened){
                tab.tabCtrl.tabStyle ={"background-color":tab.tabCtrl.color,"height":openTabHeight + '%'}; 
            }
            else{
              tab.tabCtrl.tabStyle ={"background-color":tab.tabCtrl.color,"height":closedTabHeight + '%'}; 
            }      
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
    scope: {   },
    transclude:true, 
    controller:'accordionController',
    controllerAs: 'accordionCtrl',
    template: '<div class="box" ng-style=accordionCtrl.size ng-transclude> </div>'
   }
})
.directive('accordionTab', function() {
  return {
    restrict: 'EA',
    require:"^accordion",
    replace:true,
    scope:{initiallyOpen:'=' },
    bindToController:{  
        itemTitle: '@',
        color:'@'
       },
    controller: function(){       
        this.isOpened; //so I know I have this one
        this.tabStyle = {"background-color":this.color};   
           
        
    },
    controllerAs: 'tabCtrl',
    transclude:true,   
    link:function(scope,element,attrs,parentCtrl){
   
        scope.tabCtrl.isOpened = !!scope.initiallyOpen;
        parentCtrl.addTabs(scope);
        scope.tabCtrl.toggleTab = function(){  
            if(!scope.tabCtrl.isOpened){       
                parentCtrl.openTab(this);
            }
            
        }
     
    },

    template: '<div class="tab" ng-class="{active:tabCtrl.isOpened}" ng-click=tabCtrl.toggleTab() ng-style="tabCtrl.tabStyle">'
     +         ' <div class="innertab">'
     +           ' <div class="titlebar">'
     +              '<span class="lineleft" ng-class="{ slideInLeft:tabCtrl.isOpened,slideOutLeft:tabCtrl.isClosed}"></span>'
     +              '<p>{{tabCtrl.itemTitle}}</p>'
     +              '<span class="lineright" ng-class="{slideInRight:tabCtrl.isOpened,slideOutRight:tabCtrl.isClosed}"></span>'
     +          ' <div class="text" ng-transclude></div>'
     +       '</div>'
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

