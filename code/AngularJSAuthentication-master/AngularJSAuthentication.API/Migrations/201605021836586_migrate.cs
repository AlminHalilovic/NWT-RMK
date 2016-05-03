namespace AngularJSAuthentication.API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class migrate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetRoles", "RoleName", c => c.String(maxLength: 100));
            AddColumn("dbo.AspNetRoles", "Discriminator", c => c.String(nullable: false, maxLength: 128));
            DropColumn("dbo.AspNetUsers", "Level");
            DropColumn("dbo.AspNetUsers", "JoinDate");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AspNetUsers", "JoinDate", c => c.DateTime());
            AddColumn("dbo.AspNetUsers", "Level", c => c.Byte());
            DropColumn("dbo.AspNetRoles", "Discriminator");
            DropColumn("dbo.AspNetRoles", "RoleName");
        }
    }
}
