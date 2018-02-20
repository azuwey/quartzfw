import {ServerDecorator, Get} from './sever.decorator';
import * as Express from 'express';

class Server {
	@ServerDecorator({ port: 3000 })
	private server?: Express.Application

	@Get('/')
	public _indexPage() {}
	
}

let server = new Server();