import template from './RecipesRouterView.html';
import { customElement } from 'aurelia';

@customElement({
    name: 'RecipesRouterView',
    template
})
export default class RecipesRouter {
  Id: string;
  async canLoad(params) {
    this.Id = params.Id;
  }
}
