import { GatewayDecorator } from "../../decorators/gateway.decorator";
import { IncomeDecorator } from "../..";
import * as Ws from 'ws';

@GatewayDecorator()
export default class IndexGateway {
	@IncomeDecorator('message')
	private name(ws: Ws, message: Ws.Data) {
		console.log('test')
	}
}