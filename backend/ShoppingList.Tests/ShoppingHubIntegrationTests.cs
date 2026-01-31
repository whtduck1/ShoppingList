using Xunit;
using ShoppingList.Api.Hubs;
using Microsoft.AspNetCore.SignalR;
using Moq;
using System.Threading.Tasks;

namespace ShoppingList.Tests.Integration
{
    public class ShoppingHubIntegrationTests
    {
        [Fact]
        public async Task SyncData_BroadcastsToClients()
        {
            // Arrange
            var mockClients = new Mock<IHubCallerClients>();
            var mockContext = new Mock<HubCallerContext>();
            var hub = new ShoppingHub()
            {
                Clients = mockClients.Object,
                Context = mockContext.Object
            };
        }
    }
}
