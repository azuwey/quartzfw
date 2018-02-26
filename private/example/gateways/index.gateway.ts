import { GatewayDecorator } from "../../decorators/gateway.decorator";
import { IncomeDecorator } from "../..";
import { connection, IMessage } from "websocket";

@GatewayDecorator()
export default class IndexGateway {
	@IncomeDecorator('message')
	private name(ws: connection, message: IMessage) {
		console.log('test')
	}
}