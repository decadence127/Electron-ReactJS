package Controllers;

public class MessageController implements IMessageController {
    String messageType;
    Object message;

    @Override
    public Object getMessage() {
        return this.message;
    }

    @Override
    public void setMessage(MessageController message) {
        this.message = message;

    }

    @Override
    public String getMessageType() {
        return this.messageType;
    }

    @Override
    public void setMessageType(String messageType) {
        this.messageType = messageType;
    }
}
