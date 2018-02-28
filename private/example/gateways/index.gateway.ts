import * as Ws from 'ws';

import { GatewayDecorator, IncomeDecorator } from '../..';

@GatewayDecorator()
export default class IndexGateway {
	@IncomeDecorator('test')
	private name(ws: Ws, message: string) {
		ws.send((new Date()).getTime());
	}
}