import {Catalog} from 'react-planner';

let catalog = new Catalog();

import * as Items from './items/**/planner-element.jsx';

for( let x in Items ) catalog.registerElement( Items[x] );

export default catalog;
