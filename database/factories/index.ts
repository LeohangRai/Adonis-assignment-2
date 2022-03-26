import Factory from '@ioc:Adonis/Lucid/Factory'
import Category from 'App/Models/Category'

export const CategoryFactory = Factory.define(Category, ({ faker }) => {
  return {
    title: faker.unique(faker.commerce.productAdjective),
    slug: faker.unique(faker.commerce.productAdjective),
  }
}).build()
