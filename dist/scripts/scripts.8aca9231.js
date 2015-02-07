"use strict";angular.module("translateApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","pascalprecht.translate"]).constant("DEBUG_MODE",!1).constant("LOCALES",{locales:{ru_RU:"Русский",en_US:"English"},preferredLocale:"en_US"}).config(function($routeProvider){$routeProvider.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/contacts",{templateUrl:"views/contacts.html",controller:"ContactsCtrl"}).otherwise({redirectTo:"/"})}).config(function($compileProvider,DEBUG_MODE){DEBUG_MODE||$compileProvider.debugInfoEnabled(!1)}).config(function($translateProvider,DEBUG_MODE,LOCALES){DEBUG_MODE&&$translateProvider.useMissingTranslationHandlerLog(),$translateProvider.useStaticFilesLoader({prefix:"resources/locale-",suffix:".json"}),$translateProvider.preferredLanguage(LOCALES.preferredLocale),$translateProvider.useLocalStorage()}),angular.module("translateApp").controller("AppCtrl",function($scope,$rootScope,$translate){$scope.locale=$translate.use(),$rootScope.$on("$translateChangeSuccess",function(event,data){$scope.locale=data.language});var offStopAnimation,stopLoadingAnimation=function(){angular.element("#app-loading-wrapper").remove(),angular.element(".app-loading-hidden").removeClass("app-loading-hidden")},applyStopAnimationOnce=function(){stopLoadingAnimation(),offStopAnimation()};$translate.proposedLanguage()?offStopAnimation=$rootScope.$on("$translateChangeSuccess",applyStopAnimationOnce):stopLoadingAnimation(),$rootScope.$on("$routeChangeSuccess",function(event,current){$scope.currentPath=current.$$route.originalPath})}),angular.module("translateApp").controller("MainCtrl",function($scope){$scope.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("translateApp").controller("AboutCtrl",function($scope){$scope.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("translateApp").controller("ContactsCtrl",function($scope){$scope.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("translateApp").service("LocaleService",function($translate,LOCALES,$rootScope){var localesObj=LOCALES.locales,_LOCALES=Object.keys(localesObj);_LOCALES&&0!==_LOCALES.length||console.error("There are no _LOCALES provided");var _LOCALES_DISPLAY_NAMES=[];_LOCALES.forEach(function(locale){_LOCALES_DISPLAY_NAMES.push(localesObj[locale])});var currentLocale=null,checkLocaleIsValid=function(locale){return-1!==_LOCALES.indexOf(locale)};$rootScope.$on("$translateChangeSuccess",function(event,data){document.documentElement.setAttribute("lang",data.language)});var setLocale=function(locale){return checkLocaleIsValid(locale)?(currentLocale=locale,void $translate.use(locale)):void console.error('Locale name "'+locale+'" is invalid')};return currentLocale=$translate.proposedLanguage(),{getLocaleDisplayName:function(){return localesObj[currentLocale]},setLocaleByDisplayName:function(localeDisplayName){setLocale(_LOCALES[_LOCALES_DISPLAY_NAMES.indexOf(localeDisplayName)])},getLocalesDisplayNames:function(){return _LOCALES_DISPLAY_NAMES}}}),angular.module("translateApp").directive("ngTranslateLanguageSelect",function(LocaleService){return{restrict:"A",replace:!0,template:'          <div class="language-select" ng-if="visible">            <label>            {{"directives.language-select.Language" | translate}}:              <select ng-model="currentLocaleDisplayName"                ng-options="localesDisplayName for localesDisplayName in localesDisplayNames"                ng-change="changeLanguage(currentLocaleDisplayName)">              </select>            </label>          </div>        ',controller:function($scope){$scope.currentLocaleDisplayName=LocaleService.getLocaleDisplayName(),$scope.localesDisplayNames=LocaleService.getLocalesDisplayNames(),$scope.visible=$scope.localesDisplayNames&&$scope.localesDisplayNames.length>1,$scope.changeLanguage=function(locale){LocaleService.setLocaleByDisplayName(locale)}}}});