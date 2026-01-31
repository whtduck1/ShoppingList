using Xunit;
using Microsoft.AspNetCore.SignalR.Client;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace ShoppingList.Tests.Integration
{
    public class SignalRIntegrationTests
    {
        [Fact]
        public async Task Should_Receive_Notification_On_Item_Change()
        {
            // Arrange
            var received = false;
            var connection = new HubConnectionBuilder()
                .WithUrl("http://localhost:5295/shoppingHub")
                .Build();

            connection.On("ReceiveItemsUpdate", () => { received = true; });
            await connection.StartAsync();

            // Wait for notification (timeout 2s)
            await Task.Delay(2000);

            await connection.StopAsync();

            // Assert
            Assert.True(received, "Should receive SignalR notification");
        }
    }
}
