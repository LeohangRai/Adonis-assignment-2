import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category'

export default class CategorySeeder extends BaseSeeder {
  public async run() {
    const newCategories = [
      {
        title: 'Electronics',
        slug: 'electronics',
      },
      {
        title: 'Groceries',
        slug: 'groceries',
      },
      {
        title: 'Clothing',
        slug: 'clothing',
      },
      {
        title: 'Gifts',
        slug: 'gifts',
      },
      {
        title: 'Health and Beauty',
        slug: 'health-beauty',
      },
      {
        title: 'Sports & Fitness',
        slug: 'sports-fitness',
      },
    ]
    await Category.createMany(newCategories)
  }
}
