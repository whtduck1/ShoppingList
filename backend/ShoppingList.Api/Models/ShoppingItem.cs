namespace ShoppingList.Api.Models
{
    public class ShoppingItem
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool IsBought { get; set; }
    }
}
