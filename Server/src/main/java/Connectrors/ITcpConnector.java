package Connectrors;

import Models.TransferModel;

import java.io.IOException;

public interface ITcpConnector {
    void startConnection() throws IOException;
    TransferModel getMessageFromClient() throws IOException, ClassNotFoundException;
    void sendMessageToClient(TransferModel object) throws IOException;
    void closeConnection() throws IOException;

}
