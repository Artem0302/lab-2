<?xml version="1.0" encoding="UTF-8"?>
<xsl:transform version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <body>
                <h1>Projects</h1>
                <table border="1">
                    <tr>
                        <th>Name</th>
                        <th>Faculty</th>
                        <th>Department</th>
                        <th>laboratory</th>
                        <th>project</th>
                    </tr>
                    <xsl:for-each select="scienceDataBase/draft">
                        <tr>
                            <td>
                                <xsl:value-of select="@Name"/>
                            </td>
                            <td>
                                <xsl:value-of select="@Faculty"/>
                            </td>
                            <td>
                                <xsl:value-of select="@Department"/>
                            </td>
                            <td>
                                <xsl:value-of select="@laboratory"/>
                            </td>
                            <td>
                                <xsl:value-of select="@project"/>
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:transform>