import { GatewayDecorator } from "../../decorators/gateway.decorator";
import { IncomeDecorator } from "../..";
import { connection, IMessage } from "websocket";

@GatewayDecorator('test')
export default class TestGateway {
	@IncomeDecorator('message')
	private name(ws: connection, message: IMessage) {
		
	}
}