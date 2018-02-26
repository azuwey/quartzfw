import { GatewayDecorator } from "../../decorators/gateway.decorator";
import { IncomeDecorator } from "../..";
import { connection, IMessage } from "websocket";

@GatewayDecorator('cat')
export default class CatGateway {
	@IncomeDecorator('message')
	private name(ws: connection, message: IMessage) {
		
	}
}