package Models.EntityModel;

public class UnitCategoryEntityModel {
    public class CustomsCategoryEntityModel{
        String category;
        int taxPercentage;

        public String getCategory() {
            return category;
        }

        public void setCategory(String category) {
            this.category = category;
        }
    }
}
