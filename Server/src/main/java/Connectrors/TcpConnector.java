package Connectrors;

import Models.TransferModel;
import com.google.gson.Gson;
import com.google.gson.stream.JsonReader;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

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
        int len = 65536;
        byte[] receivedBytes = new byte[len];
        inputStream.read(receivedBytes, 0, len);

        String jsonObject = new String(receivedBytes, 0, len, StandardCharsets.UTF_8);
        JsonReader reader = new JsonReader(new StringReader(jsonObject));
        reader.setLenient(true);
    return new Gson().fromJson(reader, TransferModel.class);
    }

    @Override
    public void sendMessageToClient(TransferModel object) throws IOException {
        var jsonObject = new Gson().toJson(object);

        byte[] toSendBytes = jsonObject.getBytes(StandardCharsets.UTF_8);
        outputStream.write(toSendBytes);
    }

    @Override
    public void closeConnection() throws IOException {
        clientAccepted.close();
        serverSocket.close();
    }
}
