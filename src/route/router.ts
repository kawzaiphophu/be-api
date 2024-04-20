import express, { Router, Request, Response } from 'express';
import { myDataSource } from '../config/dataSource';
import UserSchema from '../config/userSchema';

const router: Router = express.Router();

// Main APi
router.get('/', async (req: Request, res: Response) => {
    try {
        res.render('home');
    } catch (error: unknown) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Find all users
router.get('/users', async (req: Request, res: Response) => {
    try {
        const userRepository = myDataSource.getRepository(UserSchema);
        const users = await userRepository.find({ order: { id: 'ASC' } });
        res.json(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Find one user by ID, email, username, country, blood_group
router.get('/user/:param', async (req: Request, res: Response) => {
    try {
        const param = req.params.param;
        const userRepository = myDataSource.getRepository(UserSchema);

        // Check if the parameter is a valid integer ID
        if (/^\d+$/.test(param)) {
            const userId = parseInt(param);
            const userById = await userRepository.findOne({ where: { id: userId } });
            if (userById) {
                return res.json(userById);
            }
        }

        // Find user by email, username, country, blood_group
        const user = await userRepository.findOne({
            where: [
                { email: param },
                { username: param },
                { country: param },
                { blood_group: param.toUpperCase() }
            ]
        });

        if (user) {
            return res.json(user);
        }

        // If no user found, return 404
        res.status(404).json({ error: 'User not found' });
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Find one user by phone Number
router.get('/user/phone/:phone', async (req: Request, res: Response) => {
    try {
        const phoneNumber = req.params.phone;
        const userRepository = myDataSource.getRepository(UserSchema);

        const userByPhone = await userRepository.findOne({ where: { phone: phoneNumber } });

        if (userByPhone) {
            return res.json(userByPhone);
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error retrieving user by phone:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Find one user by Card id
router.get('/user/idcard/:idCard', async (req: Request, res: Response) => {
    try {
        const idCard = req.params.idCard;
        const userRepository = myDataSource.getRepository(UserSchema);

        const userByIdCard = await userRepository.findOne({ where: { user_id_card: idCard } });

        if (userByIdCard) {
            return res.json(userByIdCard);
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error retrieving user by ID card:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add a new user
router.post('/add', async (req: Request, res: Response) => {
    try {
        const { username, email, phone, user_id_card } = req.body;
        if (!username || !email || !phone || !user_id_card) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const userRepository = myDataSource.getRepository(UserSchema);
        const newUser = userRepository.create(req.body);
        const savedUser = await userRepository.save(newUser);
        res.json(savedUser);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a user by ID
router.delete('/user/:id', async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        const userRepository = myDataSource.getRepository(UserSchema);
        const user = await userRepository.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await userRepository.delete({ id: userId });
        res.json({ message: `User ID ${userId} deleted successfully` });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a user by ID
router.patch('/user/:id', async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        const userRepository = myDataSource.getRepository(UserSchema);
        const user = await userRepository.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await userRepository.update({ id: userId }, req.body);
        const updatedUser = await userRepository.findOne({ where: { id: userId } });
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
