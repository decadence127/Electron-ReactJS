package Connectrors;

import Models.TransferModel;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class TcpConnector implements ITcpConnector{

    private int _port;

    ServerSocket serverSocket;
    Socket clientAccepted;

    InputStream inputStream;
    OutputStream outputStream;

    public TcpConnector(int port) {
        _port = port;
    }

    @Override
    public void startConnection() throws IOException {
        serverSocket = new ServerSocket(_port);
        clientAccepted = serverSocket.accept();

        inputStream = clientAccepted.getInputStream();
        outputStream = clientAccepted.getOutputStream();
    }

    @Override
    public TransferModel getMessageFromClient() throws IOException, ClassNotFoundException {
        return null;
    }

    @Override
    public void sendMessageToClient(TransferModel object) throws IOException {

    }

    @Override
    public void closeConnection() throws IOException {
        clientAccepted.close();
        serverSocket.close();
    }
}
