import axios from 'axios';
import { SERVERLINK } from '../constants';

export const api= axios.create({
    baseURL: SERVERLINK,
    
})