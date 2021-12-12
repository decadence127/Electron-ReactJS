package Utils;

public class ConstTypes {
    public static class ActionTypes{
        public static final int START_CONNECTION = 1;
        public static final int CLOSE_CONNECTION = -1;
        public static final int LOGIN_ACTION = 2;
        public static final int REGISTER_ACTION = 3;
        public static final int CALC_GOODS_ACTION = 4;
        public static final int CALC_AUTO_ACTION = 5;
        public static final int GET_USERS_ACTION = 6;
        public static final int ADD_UNIT = 7;
        public static final int GET_USER_UNITS = 8;
        public static final int GET_UNITS = 9;
        public static final int EDIT_USER = 10;
        public static final int BAN_USERS = 11;
        public static final int DELETE_ITEMS = 12;
        public static final int PROMOTION_ACTION = 13;
        public static final int UNBAN_USERS = 14;
        public static final int RETRIEVE_ALL_CATEGORIES = 15;
        public static final int UPDATE_UNIT = 16;
        public static final int CREATE_CATEGORY = 17;
        public static final int DELETE_CATEGORY = 18;

        private ActionTypes(){};
    }
   public static class UserRoles{
        public static final int User = 1;
        public static final int Operator = 2;
        public static final int Administrator = 3;
        private UserRoles(){};
    }
    public static class ExecutionResult {
        public static final int ERROR_CODE = 1;
        public static final int SUCCESS_CODE = 0;
        private ExecutionResult() {};
    }

    private ConstTypes(){};
}
