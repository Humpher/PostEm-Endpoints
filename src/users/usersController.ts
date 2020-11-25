import express, { RequestHandler } from 'express';
import { UsersModel } from './usersModel';
import { Database } from '../common/MongoDB';
import { Config } from '../config';

export class UsersController {
    static db: Database = new Database(Config.url, "users");
    static usersTable = 'users';
    //static notesTable = 'notes';



    //getUsers
    //sends a json object with all users in the system that match :name
    /*getUsers(req: express.Request, res: express.Response) {
        const username = req.params.username;
        UsersController.db.getRecords(UsersController.usersTable, { username: username })
            .then((results) => res.send({ fn: 'getUsers', status: 'success', data: results }).end())
            .catch((reason) => res.status(500).send(reason).end());

    }*/
    getUser(req: express.Request, res: express.Response) {
        const username = req.body.email;
        //const id = Database.stringToId(req.params.id);
        //const notes = req.params.notes;
        UsersController.db.getOneRecord(UsersController.usersTable, { email: username })
            .then((results) => res.send({ fn: 'getUser', status: 'success', data: results.username }).end())
            .catch((reason) => res.status(500).send(reason).end());
    }

    addUser(req: express.Request, res: express.Response) {
        
        const notes = req.body.notes
        UsersController.db.addRecord(UsersController.usersTable,  {notes:notes})
            .then((result: boolean) => res.send({ fn: 'addUser', status: 'success' }).end())
            .catch((reason) => res.status(500).send(reason).end());
    }

   addNote(req: express.Request, res: express.Response){
    const proj: UsersModel = UsersModel.fromObject(req.body);

        UsersController.db.addRecord(UsersController.usersTable, proj.toObject())
            .then((result: boolean) => res.send({ fn: 'addNote', status: 'success' }).end())
            .catch((reason) => res.status(500).send(reason).end());

        
    }

    getNotes(req: express.Request, res: express.Response) {

        const email = req.body.email;
        const id = Database.stringToId(req.params.id);
        UsersController.db.getOneRecord(UsersController.usersTable, { email: email })
            .then((results) => res.send({ fn: 'getNotes', status: 'success', data: results}).end())
            .catch((reason) => res.status(500).send(reason).end());

    }

    getNote(req: express.Request, res: express.Response) {

        const username = req.params.username;
        //const id = Database.stringToId(req.params.id);
        const notes_id = req.params.notes_id;
        UsersController.db.getOneRecord(UsersController.usersTable, { username: username, notes_id: notes_id })
            .then((results) => res.send({ fn: 'getUser', status: 'success', data: results }).end())
            .catch((reason) => res.status(500).send(reason).end());

    }

    updateUser(req: express.Request, res: express.Response) {
        const id = Database.stringToId(req.params.id);
        const username = req.params.username;
        //delete data.authUser;
        UsersController.db.updateRecord(UsersController.usersTable, { _id: id }, { $set: req.params.username })
            .then((results) => results ? (res.send({ fn: 'updateUser', status: 'success' })) : (res.send({ fn: 'updateUser', status: 'failure', data: 'Not found' })).end())
            .catch(err => res.send({ fn: 'updateUser', status: 'failure', data: err }).end());

    }

    updateNotes(req: express.Request, res: express.Response) {
        const id = Database.stringToId(req.params.id);
        const data = req.body;
        delete data.authUser;
        UsersController.db.updateRecord(UsersController.usersTable, { _id: id }, { $set: req.body })
            .then((results) => results ? (res.send({ fn: 'updateNotes', status: 'success' })) : (res.send({ fn: 'updateNotes', status: 'failure', data: 'Not found' })).end())
            .catch(err => res.send({ fn: 'updateNotes', status: 'failure', data: err }).end());

    }

    //Ask: Can you just delete a user and leave the notes in the system?
    deleteUser(req: express.Request, res: express.Response) {

        const id = Database.stringToId(req.params.id);
        const username = req.params.username;
        UsersController.db.deleteRecord(UsersController.usersTable, { _id: id, username:username })
            .then((results) => results ? (res.send({ fn: 'deleteUser', status: 'success' })) : (res.send({ fn: 'deleteNotes', status: 'failure', data: 'Not found' })).end())
            .catch((reason) => res.status(500).send(reason).end());

    }

    //Question follow-up
    deleteNotes(req: express.Request, res: express.Response) {

        const id = Database.stringToId(req.params.id);
        UsersController.db.deleteRecord(UsersController.usersTable, { _id: id })
            .then((results) => results ? (res.send({ fn: 'deleteNotes', status: 'success' })) : (res.send({ fn: 'deleteNotes', status: 'failure', data: 'Not found' })).end())
            .catch((reason) => res.status(500).send(reason).end());

    }


}