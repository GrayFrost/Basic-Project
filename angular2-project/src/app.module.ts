/**
 * Created by Administrator on 2017/5/21.
 */
import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {IndexComponent} from './index/index.component';
import {OtherComponent} from './other/other.component';

import appRoutes from './app.routes';

@NgModule({
    imports: [BrowserModule, RouterModule, appRoutes],
    declarations: [AppComponent, IndexComponent, OtherComponent],
    bootstrap: [AppComponent]
})

export class AppModule {
}