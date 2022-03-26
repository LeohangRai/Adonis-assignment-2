import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Product from 'App/Models/Product'

export default class ProductsController {
  public async index({ view }: HttpContextContract) {
    const products = await Product.query().preload('category')
    return view.render('product/index', { products, title: 'Products' })
  }

  public async create({ view }: HttpContextContract) {
    // passing categories for select category options

    const categories = await Category.all()
    console.log('categories: ', categories)
    console.log('im here')
    return view.render('product/create', { categories, title: 'Create product' })
  }

  public async store({ request, response, session }: HttpContextContract) {
    try {
      const newProduct = await Product.create({
        name: request.input('name'),
        brand: request.input('brand'),
        categoryId: request.input('category'),
        description: request.input('description'),
      })

      console.log(newProduct)
      return response.redirect().toRoute('products.index')
    } catch (e) {
      session.flash('error-messages', e.message)
      return response.redirect('back')
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({ params, view }: HttpContextContract) {
    const id = params.id
    const product = await Product.findOrFail(id)
    const categories = await Category.all()
    return view.render('product/edit', { product, categories, title: 'Edit product' })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const id = params.id
    const product = await Product.findOrFail(id)
    const newData = {
      name: request.input('name'),
      brand: request.input('brand'),
      description: request.input('description'),
      categoryId: request.input('category'),
    }
    product.merge(newData)
    await product.save()
    return response.redirect().toRoute('products.index')
  }

  public async destroy({ params, response }: HttpContextContract) {
    const id = params.id
    const product = await Product.findOrFail(id)
    await product.delete()

    return response.redirect('back')
  }
}
