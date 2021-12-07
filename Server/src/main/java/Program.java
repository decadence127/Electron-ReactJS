import Connectrors.ITcpConnector;
import Connectrors.TcpConnector;
import Context.PostgresContext;
import Context.UserContext;
import Controllers.ThreadHandler;
import Models.EntityModel.UserEntityModel;
import Models.TransferModels.TransferRequestModel;
import Models.TransferModels.TransferResponseModel;
import Utils.ConstTypes;

import java.io.IOException;
import java.sql.SQLException;


public class Program {
    public static void main(String[] args) throws SQLException, IOException {
        PostgresContext context = PostgresContext.getInstance();
        ITcpConnector initialTcpConnector = new TcpConnector(5000);

        System.out.println("Server started on 127.0.0.1:" + 5000 + "!");
        try {
            while (true) {
                System.out.println("Listening for client");
                initialTcpConnector.startConnection();
                System.out.println("New client accepted");
                var clientMessage = initialTcpConnector.getMessageFromClient();
                System.out.println(clientMessage.toString());
                if (clientMessage.ActionType == ConstTypes.ActionTypes.START_CONNECTION) {
                    System.out.println("Creating a new thread for client");
                    int connectionPort = Utils.Randomize.getRandom();

                    System.out.println("Client will run on port " + connectionPort);
                    initialTcpConnector.sendMessageToClient(new TransferResponseModel(ConstTypes.ExecutionResult.SUCCESS_CODE, String.valueOf(connectionPort)));

                    Thread handlerThread = new Thread(new ThreadHandler(connectionPort));
                    handlerThread.start();
                }
                Thread.sleep(3000);
                initialTcpConnector.closeConnection();
                System.out.println("Connection closed");
            }
        } catch (IOException | ClassNotFoundException | InterruptedException e) {
            e.printStackTrace();
        } finally {
            initialTcpConnector.closeConnection();
        }

    }
}