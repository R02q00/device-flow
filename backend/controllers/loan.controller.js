import db from '../models/model.js';
const Loan = db.loan;
const Tool = db.tools;

export const getAllLoan = async (req, res) => {
    try {
        const loans = await Loan.findAll({
            include: [{
                model: Tool,
                through: { attributes: [] },
                attributes: ['id', 'name']
            }]
        });
        res.status(200).json({ loans });
    } catch (error) {
        console.error('Error fetching loans:', error);
        res.status(500).json({ message: 'Failed to fetch loans', error: error.message });
    }
};

export const getLoan = async (req, res) => {
    try {
        const loan = await Loan.findByPk(req.params.loanId, {
            include: [{
                model: Tool,
                through: { attributes: [] },
                attributes: ['id', 'name']
            }]
        });
        
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        
        res.status(200).json({ loan });
    } catch (error) {
        console.error('Error fetching loan:', error);
        res.status(500).json({ message: 'Failed to fetch loan', error: error.message });
    }
};

export const createLoan = async (req, res) => {
    const { loaner, statut, start, end, toolsIds } = req.body;
    console.log(toolsIds);
    try {

        if (!loaner || !statut || !start || !end) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const loan = await Loan.create({ loaner, statut, start, end });

        if (toolsIds && toolsIds.length > 0) {
            const tools = await Tool.findAll({ where: { id: toolsIds } });
            if (tools.length !== toolsIds.length) {
                return res.status(400).json({ message: 'One or more tools not found' });
            }
            await loan.addTools(toolsIds);
        }

        const loanWithTools = await Loan.findByPk(loan.id, {
            include: [{
                model: Tool,
                through: { attributes: [] },
                attributes: ['id', 'name']
            }]
        });

        res.status(201).json({
            message: 'Loan created successfully',
            loan: loanWithTools
        });
    } catch (error) {
        console.error('Error creating loan:', error);
        res.status(500).json({ message: 'Failed to create loan', error: error.message });
    }
};

export const updateLoan = async (req, res) => {
    const { loanId, loaner, statut, start, end, toolsIds } = req.body;

    try {
        const loan = await Loan.findByPk(loanId);
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }

        loan.loaner = loaner || loan.loaner;
        loan.statut = statut || loan.statut;
        loan.start = start || loan.start;
        loan.end = end || loan.end;
        await loan.save();

        if (toolsIds) {
            const tools = await Tool.findAll({ where: { id: toolsIds } });
            if (tools.length !== toolsIds.length) {
                return res.status(400).json({ message: 'One or more tools not found' });
            }
            await loan.setTools(toolsIds);
        }

        const updatedLoan = await Loan.findByPk(loanId, {
            include: [{
                model: Tool,
                through: { attributes: [] },
                attributes: ['id', 'name']
            }]
        });

        res.status(200).json({
            message: 'Loan updated successfully',
            loan: updatedLoan
        });
    } catch (error) {
        console.error('Error updating loan:', error);
        res.status(500).json({ message: 'Failed to update loan', error: error.message });
    }
};

export const deleteLoan = async (req, res) => {
    try {
        const loan = await Loan.findByPk(req.params.loanId);
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }

        await loan.destroy();
        res.status(200).json({ message: 'Loan deleted successfully' });
    } catch (error) {
        console.error('Error deleting loan:', error);
        res.status(500).json({ message: 'Failed to delete loan', error: error.message });
    }
};