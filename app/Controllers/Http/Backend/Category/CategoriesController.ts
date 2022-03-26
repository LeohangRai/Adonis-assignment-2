import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoriesController {
  // home
  public async index({ view }: HttpContextContract) {
    const categories = await Category.all()
    return view.render('category/index', { categories, title: 'Categories' })
  }

  // create category form
  public async create({ view }: HttpContextContract) {
    return view.render('category/create', { title: 'Create category' })
  }

  // create category submission
  public async store({ request, response }: HttpContextContract) {
    const newCategory = await Category.create({
      title: request.input('title'),
      slug: request.input('slug'),
    })
    console.log(newCategory)
    return response.redirect().toRoute('categories.index')
  }

  public async show({}: HttpContextContract) {}

  // update category form
  public async edit({ params, view }: HttpContextContract) {
    const id = params.id
    const category = await Category.findOrFail(id)
    return view.render('category/edit', { category, title: 'Edit category' })
  }

  // update category submission
  public async update({ params, request, response }: HttpContextContract) {
    const id = params.id
    const category = await Category.findOrFail(id)
    const newData = {
      title: request.input('title'),
      slug: request.input('slug'),
    }
    category.merge(newData)
    await category.save()
    return response.redirect().toRoute('categories.index')
  }

  // delete category
  public async destroy({ params, response }: HttpContextContract) {
    const id = params.id
    const category = await Category.findOrFail(id)
    await category.delete()

    return response.redirect('back')
  }
}
