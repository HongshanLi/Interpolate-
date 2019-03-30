## Front-end routings
Front-end routings are defined at `src/app/app-routing.module.ts`. 
More specifically, you should be able to figure out which 
front-end route correspond to which component by inspecting the 
list `appRoutes`. For example, the route
```
localhost:4200/my-library
```
points to the component `EntityDetailComponent`. 

This means if you navigate to the route `localhost:4200/my-library`,
you will see the template defined as
```
src/app/entity-detail/entity.detail.html
```

One can figure out where the component are defined by looking 
at the import statements at the begining of 
`src/app/app-routing.module.ts`. 
For example,
`EntityDetailComponent` is defined at 
```
src/app/entity-detail/entity.detail.component.ts
```
Notice that in the import statements, the extension `.ts` is dropped for
absolute no reason!!!

### pop-up quiz
On each page of our app, write down the corresponding component and their
path.

## Front-end components
Front-end component used in the import statements above is a typescript
class. It is always defined in a typescript file under the decorator
`@Component`, which needs to be imported from `@angular/core`.

For example in `src/app/entity-detail/entity-detail.component.ts`, you
will see something like:

```
@Component({
  selector: 'app-entity-detail',
  templateUrl: './entity-detail.component.html',
  styleUrls: ['./entity-detail.component.css']
})
```
Each front-end component consists of three parts: 
`view = html code`, `control = typescript code`,`style = css code`
For example, in the `EntityDetailComponent` the view is defined 
at `./entity-detail.component.html` and style is defined by
`./entity-detail.component.css`.

As a good practice for angular development, we put view, control and 
style of each component in one folder named after that component.
For example, `entity-detail/` contains the view, control and style
of `EntityDetailComponent`.


