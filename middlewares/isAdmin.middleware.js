export const isAdmin = (req, res, next) => {
  const userRole = req.user.role

  if (!userRole || !userRole.includes('Admin')) {
    return res.status(403).json({ message: 'Acceso no autorizado' })
  }

  next()
}
