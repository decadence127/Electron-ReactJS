package Controllers;


public interface IMessageController {
    Object getMessage();
    void setMessage(MessageController message);
    String getMessageType();
    void setMessageType(String messageType);
}
