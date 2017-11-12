/**
 * Created by Administrator on 2017/5/21.
 */
import {RouterModule} from '@angular/router';

import {IndexComponent} from './index/index.component';
import {OtherComponent} from './other/other.component';

const appRoutes = [
    {path: '', component: IndexComponent},
    {path: 'other', component: OtherComponent}
];

export default RouterModule.forRoot(appRoutes);