import { Products } from '../models/associations.js'
import { validationProduct } from '../validations/products.validation.js'

export class ProductController {
  static async getAll (req, res) {
    try {
      const findAll = await Products.findAll()

      return res.status(200).json(findAll)
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Error intero del servidor' })
    }
  }

  static async getById (req, res) {
    const { id } = req.params

    try {
      const findById = await Products.findByPk(id)

      if (!findById) {
        return res.status(404).json({ message: 'Producto no existente' })
      }

      return res.status(200).json(findById)
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Error intero del servidor' })
    }
  }

  static async createProduct (req, res) {
    const validation = validationProduct(req.body)

    if (!validation.success) {
      return res.status(422).json({
        message: 'Error de validacion',
        errors: validation.error.issues
      })
    }

    const { name, description } = validation.data

    try {
      const newProduct = await Products.create({
        name,
        description
      })

      return res.status(201).json(newProduct)
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Error intero del servidor' })
    }
  }

  static async updateProduct (req, res) {
    const { id } = req.params
    const validation = validationProduct(req.body)

    if (!validation.success) {
      return res.status(422).json({
        message: 'Error de validacion',
        errors: validation.error.issues
      })
    }

    const { name, description } = validation.data

    try {
      const updateProduct = await Products.findByPk(id)

      if (!updateProduct) {
        return res.status(404).json({ message: 'Producto no existente' })
      }

      updateProduct.update({ name, description })

      return res.status(200).json(updateProduct)
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Error intero del servidor' })
    }
  }

  static async deleteProduct (req, res) {
    const { id } = req.params

    try {
      const deletedProduct = await Products.findByPk(id)

      if (!deletedProduct) {
        return res.status(404).json({ message: 'Producto no existente' })
      }

      deletedProduct.destroy()

      return res.status(204).json(deletedProduct)
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Error intero del servidor' })
    }
  }
}
