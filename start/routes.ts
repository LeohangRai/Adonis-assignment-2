/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('home/index', { title: 'Home' })
})

Route.group(() => {
  Route.resource('categories', 'Category/CategoriesController')
  Route.resource('products', 'Product/ProductsController')
}).namespace('App/Controllers/Http/Backend')
//namespaces should be absolute path from the root dir of the app
