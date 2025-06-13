import db from "../models/model.js";
import fs from 'fs'
import { fileURLToPath } from "url";
import { console } from "inspector";
import path from "path";

const Tools = db.tools;
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename)

export const getAllTools = (req, res) => {
    Tools.findAll()
        .then(tools =>{
            res.status(200).json({tools: tools});
        })
        .catch(error => console.log(error))
};

export const getTools = (req, res) => {
    const toolsId = req.params.toolsId;
    Tools.findByPk(toolsId)
        .then( tools => {
            if(!tools){
                return res.status(404).json({message: 'Tools not found'});
            }
            res.status(200).json({tools: tools})
        })
        .catch(error => console.log(error));
};

export const getToolsActive = (req, res) => {
    Tools.findOne({
        where:{
            statut: 'good',
        }
    })
    .then(tools => {
        if(!tools){
            return res.status(404).json({message: 'Tools not found'});
        }
        res.status(200).json({tools: tools})
    })
    .catch(error => console.log(error))

};

export const createTools = (req, res) => {
    const {sequence_number, name} = req.body;
    const photoPath = req.file ? req.file.filename : req.file.filename;
    Tools.create({
        sequence_number: sequence_number,
        name: name,
        photo: photoPath,
        statut: 'good',
    })
    .then(result=>{
        console.log('Tools created');
        res.status(201).json({message: 'Tools created successfully !', tools: result})
    })
    .catch(error => console.log(error));

};

export const updateTools = (req, res, next) => {
    const toolsId = req.params.toolsId;
    const {sequence_number,name, statut} = req.body;
    const photoPath = req.file ? req.file.filename : null;
    Tools.findByPk(toolsId)
    .then(tools=>{
        if(!tools){
            return res.status(404).json({message: 'Tools not found !'})
        }
        const photoCourant = tools.photo;
        const photo = photoPath || photoCourant;
        if(photoCourant && photoPath){
            const imageAncien = path.join(__dirname, '../Public/tools', imageCourant);
            fs.unlink(imageAncien, (unlinkErr)=>{
                console.error("Something was error", unlinkErr)
            })
        }

        tools.sequence_number =sequence_number;
        tools.name = name;
        tools.statut = statut;
        tools.photo = photo;

        return tools.save();

    })
    .then(result => {
        console.log('Tools updated')
        res.status(200).json({message: 'Tools updated successfully !', tools: result})
    })
    .catch(error => console.log(error));

};

export const deleteTools = (req, res, next) => {
    const toolsId = req.params.toolsId;
    Tools.findByPk(toolsId)
        .then(tools => {
            if(!tools){
                return res.status(404).json({message: 'Tools not found !'})
            }
            return Tools.destroy({
                where: {
                    id: toolsId
                }
            });
        })
        .then(result => {
            res.status(200).json({message: 'Tools delete !', tools: result})
        })
        .catch(error => console.log(error));
}

