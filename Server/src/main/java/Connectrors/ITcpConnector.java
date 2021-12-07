package Connectrors;

import Models.TransferModels.TransferRequestModel;
import Models.TransferModels.TransferResponseModel;

import java.io.IOException;

public interface ITcpConnector {
    void startConnection() throws IOException;
    TransferRequestModel getMessageFromClient() throws IOException, ClassNotFoundException;
    void sendMessageToClient(TransferResponseModel object) throws IOException;
    void closeConnection() throws IOException;

}
