import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideStore} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {TodoAppReducer} from "./ngrx/todo-list/reducer";
import {TodoAppEffects} from "./ngrx/todo-list/effects";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideStore({todoAppState: TodoAppReducer}),
    provideEffects([TodoAppEffects]),
    provideHttpClient(withInterceptorsFromDi()), provideAnimationsAsync()
  ]
};
