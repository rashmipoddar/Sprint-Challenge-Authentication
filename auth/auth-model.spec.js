const db = require('../database/dbConfig');

const { addUser } = require('./auth-model');

describe('users model', () => {
  describe('insert', () => {
    beforeEach(async () => {
      await db('users').truncate();
    });

    it('should insert a user to db', async () => {
      await addUser({ username: 'harry', password: 'password' });

      const users = await db('users');
      expect(users).toHaveLength(1);
    });

    it('should insert the provided user', async () => {
      await addUser({ username: 'harry', password: 'password' });
      await addUser({ username: 'ron', password: 'password' });

      const users = await db('users');
      expect(users).toHaveLength(2);
      expect(users[0].username).toBe('harry');
      expect(users[1].username).toBe('ron');
    });

    it('should return the user that was inserted', async () => {
      let user = await addUser({ username: 'harry', password: 'password' });
      expect(user.username).toBe('harry');
      expect(user.id).toBeDefined();

      user = await addUser({ username: 'ron', password: 'password' });
      expect(user.username).toBe('ron');
      expect(user.id).toBeDefined();
    });

  });
});