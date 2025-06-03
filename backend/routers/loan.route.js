import express from 'express'
import {getAllLoan, getLoan, createLoan, updateLoan, deleteLoan} from '../controllers/loan.controller.js'

const router = express.Router();


router.get('/', getAllLoan);
router.get('/:loanId', getLoan);
router.post('/', createLoan);
router.put('/:loanId', updateLoan);
router.delete('/:loanId', deleteLoan)

export default router;