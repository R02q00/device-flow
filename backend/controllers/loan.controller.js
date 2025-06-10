import db from '../models/model.js';
const Loan = db.loan;

export const getAllLoan = (req, res, next) => {
    Loan.findAll()
        .then(loans=>{
            res.status(200).json({loans: loans});
        })
        .catch(error => console.log(error.loans?.message || error.message))
}

export const getLoan = (req, res, next) => {
    const loanId = req.parms.loanId;
    Loan.findByPk(loanId)
        .then(loan=>{
            if(!loan){
                return res.status(404).json({message: "Loan not found !"})
            }
            res.status(200).json({loan: loan})
        })
        .catch(error => console.log(error.loan?.message || error.message))
}

export const createLoan = (req, res, next) => {
    const {loaner, tools, statut, start, end} = req.body;
    Loan.create({
        loaner: loaner,
        tools: tools,
        statut: statut,
        start: start,
        end: end,
    })
        .then(result => {
            console.log("Loan saved !");
            res.status(201).json({message: 'Loan saved successfully !', loan: result})
        })
        .catch(error => console.log(error.result?.message || error.message))
}
export const updateLoan = (req, res, next) => {
    const loanId = req.body.loanId;
    const {loaner, tools, statut, start, end} = req.body;

    Loan.findByPk(loanId)
        .then(loan=>{
            if(!loan){
                return res.status(404).json({message: "Loan not found !"})
            }
            loan.loaner = loaner;
            loan.tools = tools;
            loan.statut = statut;
            loan.start = start;
            loan.end = end;
            return loan.save();
        })
        .then(result=>{
            console.log('Loan updated !');
            return res.status(201).json({message: 'Loan updated successfully', loan: result})
        })
        .catch(error => console.log(error.result?.message || error.message))
}

export const deleteLoan = (req, res, next) => {
    const loanId = req.params.loanId;
    Loan.findByPk(loanId)
        .then(loan => {
            if(!loan){
                return res.status(404).json({message: 'Loan not found !'})
            }
            return Tools.destroy({
                where: {
                    id: loanId
                }
            });
        })
        .then(result => {
            console.log('Loan deleted')
            res.status(200).json({message: 'Loan deleted successfully !', tools: result})
        })
        .catch(error => console.log(error));
}