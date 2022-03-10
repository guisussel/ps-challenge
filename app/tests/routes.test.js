const request = require('supertest')
const app = require('../../server')
const uniqueId = 123456;
const uniqueId2 = 123432;
const uniqueId3 = 234123;
let objectId1 = 0;
let objectId2 = 0;
let objectId3 = 0;

describe('Post Endpoints', () => {

  //test1
  it('should delete all book', async () => {
    const res = await request(app).delete('/api/books/').send();
    expect(res.statusCode).toEqual(200); //OK book deleted using ID
    expect(res.request.method).toEqual('DELETE');
  });

  // //test2
  it('should delete all bookInventory', async () => {
    const res = await request(app).delete('/api/bookInventorys/').send();
    expect(res.statusCode).toEqual(200); //OK book deleted using ID
    expect(res.request.method).toEqual('DELETE');
  });

  //test3
  it('should create a new book', async () => {
    const res = await request(app)
      .post('/api/books')
      .send({
        id: `${uniqueId}`, //id example, not autogenerated
        name: "Harry Potter And The Philosopher`s Stone",
        authors: "J.K Rowling",
        publisher: "Bloomsbury Childrens Books",
        yearOfPublication: 1997,
        summary: "Harry Potter and the Philosopher's Stone is an enthralling start to Harry's journey toward coming to terms with his past and facing his future."
      });
    expect(res.statusCode).toEqual(201);
    expect(res.request.method).toEqual('POST');
    objectId1 = res.body.book.id;
  });

  //test4
  it('should create a new book', async () => {
    const res = await request(app)
      .post('/api/books')
      .send({
        id: `${uniqueId2}`, //id example, not autogenerated
        name: "It: A Novel",
        authors: "Stephen King",
        publisher: "Suma",
        yearOfPublication: 2014,
        summary: "Welcome to Derry, Maine. Its a small city, a place as hauntingly familiar as your own hometown. Only in Derry the haunting is real.",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.request.method).toEqual('POST');
    objectId2 = res.body.book.id;
  });

  //test5
  it('should create a new book iventory', async () => {
    const res = await request(app)
      .post('/api/bookInventorys')
      .send({
        id: `${uniqueId3}`, //id example, not autogenerated
        quantity: 2
      });
    expect(res.statusCode).toEqual(201);
    expect(res.request.method).toEqual('POST');
    objectId3 = res.body.bookInventory.id;
  });

  //test6
  it('should fetch a single book', async () => {
    const res = await request(app).get(`/api/books/${objectId1}`).send();
    expect(res.statusCode).toEqual(200);
    expect(res.request.method).toEqual('GET');
  });

  //test7
  it('should fetch a single bookInventory', async () => {
    const res = await request(app).get(`/api/bookInventorys/${objectId3}`).send();
    expect(res.statusCode).toEqual(200);
    expect(res.request.method).toEqual('GET');
  });

  //test8
  it('should fetch all books', async () => {
    const res = await request(app).get(`/api/books/`).send();
    expect(res.statusCode).toEqual(200);
    expect(res.request.method).toEqual('GET');
  });

  //test9
  it('should fetch all bookInventorys', async () => {
    const res = await request(app).get(`/api/bookInventorys/`).send();
    expect(res.statusCode).toEqual(200);
    expect(res.request.method).toEqual('GET');
  });

  //test10
  it('should delete a bookInventory', async () => {
    const res = await request(app).delete(`/api/bookInventorys/${objectId3}`);
    expect(res.statusCode).toEqual(200); //OK response
  });


  //test11
  it('should update a book', async () => {
    const res = await request(app).put(`/api/books/${objectId1}`) .send({
        "authors": "author1, author2",
        "summary": "new summary",
      });
    expect(res.statusCode).toEqual(200);
  });

  //test12
  it('should respond with status code 404 if book is not found', async () => {
    const bookID = 11111111;
    const res = await request(app).get(`/api/posts/${bookID}`);
    expect(res.statusCode).toEqual(404);
  });


});
