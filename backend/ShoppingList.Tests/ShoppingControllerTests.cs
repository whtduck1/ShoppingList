using Xunit;
using ShoppingList.Api.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace ShoppingList.Tests.Controllers
{
    public class ShoppingControllerTests
    {
        [Fact]
        public async Task AddItem_ReturnsOkResult()
        {
            // Arrange
            var controller = new ShoppingController(null, null);
            var item = new ShoppingList.Api.Models.ShoppingItem { Name = "Test", IsBought = false };

            // Act
            var result = await controller.AddItem(item);

            // Assert
            Assert.IsType<OkObjectResult>(result.Result);
        }

        [Fact]
        public async Task DeleteItem_ReturnsNotFound_WhenItemDoesNotExist()
        {
            // Arrange
            var controller = new ShoppingController(null, null);

            // Act
            var result = await controller.DeleteItem(999);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task UpdateItem_ReturnsBadRequest_WhenIdMismatch()
        {
            // Arrange
            var controller = new ShoppingController(null, null);
            var item = new ShoppingList.Api.Models.ShoppingItem { Id = 1, Name = "Test", IsBought = false };

            // Act
            var result = await controller.UpdateItem(2, item);

            // Assert
            Assert.IsType<BadRequestResult>(result);
        }
    }
}
