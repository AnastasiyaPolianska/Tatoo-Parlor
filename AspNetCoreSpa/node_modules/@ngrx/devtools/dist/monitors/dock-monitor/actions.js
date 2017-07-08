"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var DockActions = (function () {
    function DockActions() {
    }
    DockActions.prototype.toggleVisibility = function () {
        return { type: DockActions.TOGGLE_VISIBILITY };
    };
    DockActions.prototype.changePosition = function () {
        return { type: DockActions.CHANGE_POSITION };
    };
    DockActions.prototype.changeSize = function (size) {
        return { type: DockActions.CHANGE_SIZE, payload: size };
    };
    DockActions.prototype.changeMonitor = function () {
        return { type: DockActions.CHANGE_MONITOR };
    };
    DockActions.TOGGLE_VISIBILITY = '@@redux-devtools-log-monitor/TOGGLE_VISIBILITY';
    DockActions.CHANGE_POSITION = '@@redux-devtools-log-monitor/CHANGE_POSITION';
    DockActions.CHANGE_SIZE = '@@redux-devtools-log-monitor/CHANGE_SIZE';
    DockActions.CHANGE_MONITOR = '@@redux-devtools-log-monitor/CHANGE_MONITOR';
    DockActions = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DockActions);
    return DockActions;
}());
exports.DockActions = DockActions;
