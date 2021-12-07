<?xml version="1.0" encoding="UTF-8"?>
<xsl:transform version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <body>
                <h1>Students</h1>
                <table border="1">
                    <tr>
                        <th>Name</th>
                        <th>Faculty</th>
                        <th>Department</th>
                        <th>Course</th>
                        <th>Mark</th>
                    </tr>
                    <xsl:for-each select="studentDataBase/student">
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
                                <xsl:value-of select="@Course"/>
                            </td>
                            <td>
                                <xsl:value-of select="@Mark"/>
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:transform>