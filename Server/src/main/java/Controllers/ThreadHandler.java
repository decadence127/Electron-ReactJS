package Controllers;

import Connectrors.ITcpConnector;
import Connectrors.TcpConnector;
import Utils.ConstTypes;

import java.io.IOException;

public class ThreadHandler implements Runnable {
    ITcpConnector tcpConnector;

    public ThreadHandler(int port) {
        tcpConnector = new TcpConnector(port);
    }

    @Override
    public void run() {
        try {
            tcpConnector.startConnection();
            while (true){
                var clientMessage = tcpConnector.getMessageFromClient();
                System.out.println(clientMessage);
                System.out.println("ThreadHandler");
                if(clientMessage.ActionType == ConstTypes.ActionTypes.CLOSE_CONNECTION) {
                    tcpConnector.closeConnection();
                    break;
                }
            }

        } catch (Exception e){
            System.out.println(e.getMessage());
        }

    }
}
