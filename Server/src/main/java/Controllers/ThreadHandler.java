package Controllers;

import Connectrors.ITcpConnector;
import Connectrors.TcpConnector;
import Utils.ConstTypes;

public class ThreadHandler implements Runnable {
    ITcpConnector tcpConnector;
    ControllerProvider controllerProvider;

    public ThreadHandler(int port) {
        tcpConnector = new TcpConnector(port);
        controllerProvider = new ControllerProvider();
    }

    @Override
    public void run() {
        try {
            tcpConnector.startConnection();
            while (true) {
                var clientMessage = tcpConnector.getMessageFromClient();
                System.out.println("Message from client: " + clientMessage);
                if (clientMessage.ActionType == ConstTypes.ActionTypes.CLOSE_CONNECTION) {
                    tcpConnector.closeConnection();
                    break;
                }

                var executionResult = controllerProvider.Execute(clientMessage);
                tcpConnector.sendMessageToClient(executionResult);
            }

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

    }
}
