/**
 * Created by Administrator on 2017/5/21.
 */
import {Component} from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './src/app.component.html'
})

export class AppComponent{
    private text: string;
    
    ngOnInit(){
        this.text = 'Angular2';
    }
}