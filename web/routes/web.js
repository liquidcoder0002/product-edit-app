import express from 'express'
const router = express.Router()
import createDoc from "../controller/productget.js"

// router.get('/',studentController.getAllDoc)
router.get('/product1',createDoc)
// router.get('/edit/:id',studentController.editDoc)
// router.post('/update/:id',studentController.updateDocById)
// router.post('/delete/:id',studentController.deleteDocById)

export default router;