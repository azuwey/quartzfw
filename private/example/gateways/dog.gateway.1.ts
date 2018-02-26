import { GatewayDecorator } from "../../decorators/gateway.decorator";
import { IncomeDecorator } from "../..";
import { connection, IMessage } from "websocket";

@GatewayDecorator('dog')
export default class DogGateway {
	@IncomeDecorator('message')
	private name(ws: connection, message: IMessage) {
		
	}
}